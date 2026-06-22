import nodemailer from 'nodemailer';
import twilio from 'twilio';
import booking from '../models/Bookings.js';
import car from '../models/car.js';
import user from '../models/user.js';

class NotificationService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Initialize Twilio client only if credentials exist
        if (process.env.TWILIO_SID && process.env.TWILIO_TOKEN) {
            this.twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
        }
    }

    async sendBookingNotifications(bookingId) {
        try {
            const bookingDoc = await booking.findById(bookingId).populate('car').populate('user').populate('owner');
            
            if (!bookingDoc) return;

            const carData = bookingDoc.car;
            const userData = bookingDoc.user;
            const ownerData = bookingDoc.owner;

            const emailSubjectUser = `Booking Confirmed: ${carData.make} ${carData.model}`;
            const emailTextUser = `Hi ${userData.name},\n\nYour booking for ${carData.make} ${carData.model} has been confirmed.\nPickup Date: ${new Date(bookingDoc.pickupDate).toLocaleDateString()}\nReturn Date: ${new Date(bookingDoc.returnDate).toLocaleDateString()}\nAmount Paid: ₹${bookingDoc.price}\n\nThank you for choosing Velora!`;

            const emailSubjectOwner = `New Booking Received: ${carData.make} ${carData.model}`;
            const emailTextOwner = `Hi ${ownerData.name},\n\nYou have received a new booking for your ${carData.make} ${carData.model}.\nRenter: ${userData.name}\nPickup Date: ${new Date(bookingDoc.pickupDate).toLocaleDateString()}\nReturn Date: ${new Date(bookingDoc.returnDate).toLocaleDateString()}\nEarnings: ₹${bookingDoc.price}\n\nPlease prepare the vehicle for the rental period.`;

            // Send Emails
            if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
                await this.transporter.sendMail({
                    from: `"Velora Rentals" <${process.env.EMAIL_USER}>`,
                    to: userData.email,
                    subject: emailSubjectUser,
                    text: emailTextUser
                });

                await this.transporter.sendMail({
                    from: `"Velora Rentals" <${process.env.EMAIL_USER}>`,
                    to: ownerData.email,
                    subject: emailSubjectOwner,
                    text: emailTextOwner
                });
            }

            // Send WhatsApp notifications (if configured)
            if (this.twilioClient && process.env.TWILIO_WHATSAPP_NUMBER && process.env.OWNER_WHATSAPP_NUMBER) {
                const waMessage = `🚗 *Velora Booking Update*\n\nNew Booking confirmed for ${carData.make} ${carData.model}!\nRenter: ${userData.name}\nDates: ${new Date(bookingDoc.pickupDate).toLocaleDateString()} to ${new Date(bookingDoc.returnDate).toLocaleDateString()}`;
                
                // Twilio Sandbox requires numbers in format: 'whatsapp:+919876543210'
                await this.twilioClient.messages.create({
                    body: waMessage,
                    from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
                    to: `whatsapp:${process.env.OWNER_WHATSAPP_NUMBER}`
                });
            }

        } catch (error) {
            console.error("Notification Service Error:", error);
        }
    }
}

export default new NotificationService();
