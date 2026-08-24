import axios from "axios";
import { EmailValidationsSchema, VerifyEmailValidationSchema, ResendOtpSchema } from "@repo/validations";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api/v1/auth";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export interface AuthResponse {
    success: boolean;
    message: string;
    token?: string;
    isExistingUser?: boolean;
    data?: {
        email: string;
        id: string;
    };
}

export class AuthService {
    /**
     * Trigger OTP generation by signing up with email address.
     */
    static async signup(email: string): Promise<AuthResponse> {
        const validation = EmailValidationsSchema.safeParse({ email });
        if (!validation.success) {
            throw new Error(validation.error.issues[0]?.message || "Invalid email address");
        }
        const response = await api.post<AuthResponse>("/signup", { email });
        return response.data;
    }

    /**
     * Verify 6-digit verification code.
     */
    static async verifyOtp(email: string, otp: string): Promise<AuthResponse> {
        const validation = VerifyEmailValidationSchema.safeParse({ email, otp });
        if (!validation.success) {
            throw new Error(validation.error.issues[0]?.message || "Invalid verification payload");
        }
        const response = await api.post<AuthResponse>("/verify-otp", { email, otp });
        return response.data;
    }

    /**
     * Resend OTP verification code to user's email.
     */
    static async resendOtp(email: string): Promise<AuthResponse> {
        const validation = ResendOtpSchema.safeParse({ email });
        if (!validation.success) {
            throw new Error(validation.error.issues[0]?.message || "Invalid email address");
        }
        const response = await api.post<AuthResponse>("/resend-otp", { email });
        return response.data;
    }

    /**
     * Get profile information for currently logged-in user (/me).
     */
    static async getMe(token: string): Promise<AuthResponse> {
        const response = await api.get<AuthResponse>("/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
}


export const authService = AuthService;
