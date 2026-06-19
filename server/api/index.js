export default async function handler(req, res) {
    try {
        const module = await import('../server.js');
        const app = module.default;
        await app(req, res);
    } catch (error) {
        console.error("Vercel Invocation Error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Server initialization failed", 
            error: error.message, 
            stack: error.stack 
        });
    }
}
