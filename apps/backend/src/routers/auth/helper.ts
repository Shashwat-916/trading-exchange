import crypto from 'crypto'
export type EmailType = 'WELCOME' | 'RESET_PASSWORD' | 'OTP';

export function GenerateOtp() {     
    let otp = crypto.randomInt(100000,999999)
    return otp.toString()
}

export const getMailTemplate = (type: EmailType, data: any): string => {
    switch (type) {
        case 'WELCOME':
            return `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2>Welcome to Exchange, ${data.name}! 🚀</h2>
                    <p>We are thrilled to have you on board.</p>
                    <p>Best Regards,<br/>Team Exchange</p>
                </div>
            `;
        case 'RESET_PASSWORD':
            return `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2>Password Reset Request</h2>
                    <p>Click the link below to reset your password:</p>
                    <a href="${data.resetLink}" style="background: #007bff; color: white; padding: 10px 15px; text-decoration: none;">Reset Password</a>
                </div>
            `;
        case 'OTP':
            return `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2>Your OTP Code</h2>
                    <p>Your verification code is: <strong>${data.otp}</strong></p>
                    <p>Do not share this with anyone.</p>
                </div>
            `;
        default:
            return `<p>Hello, this is a message from Exchange.</p>`;
    }
};