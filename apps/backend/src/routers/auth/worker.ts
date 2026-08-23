import { redisBlocking } from '@repo/redis'
import { getMailTemplate, type EmailType } from './helper'
import { sendEmail } from './service'

export interface EmailJob {
    to: string;
    subject: string;
    type: EmailType;
    otp?: string;
    name?: string;
    resetLink?: string;
}

export const MailWorker = async (): Promise<void> => {
    const QUEUE_NAME = 'email-queue'

    console.log(`[MailWorker] Starting worker loop on queue: "${QUEUE_NAME}"...`)

    while (true) {
        try {
            const response = await redisBlocking.brPop(QUEUE_NAME, 0)

            if (!response) {
                continue
            }

            const rawElement = typeof response === 'string' ? response : response.element
            if (!rawElement) {
                continue
            }

            const job: EmailJob = JSON.parse(rawElement)
            console.log(`[MailWorker] Picked job for recipient: ${job.to} (Type: ${job.type})`)

            const htmlContent = getMailTemplate(job.type, job)
            await sendEmail(job.to, job.subject, htmlContent)
        } catch (error) {
            console.error('[MailWorker] Exception in queue worker loop:', error)
            await new Promise((resolve) => setTimeout(resolve, 1000))
        }
    }
}