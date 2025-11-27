import type { Metadata } from 'next'
import './globals.css'
import { ActivityProvider } from '@/lib/ActivityContext'
import { TravelerActivityProvider } from '@/lib/TravelerActivityContext'
import { ProfileProvider } from '@/lib/ProfileContext'

export const metadata: Metadata = {
  title: 'Locaylo - Real people. Real places. Real travel.',
  description: 'Connect with locals and discover authentic experiences around the world.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ProfileProvider>
          <ActivityProvider>
            <TravelerActivityProvider>
              {children}
            </TravelerActivityProvider>
          </ActivityProvider>
        </ProfileProvider>
      </body>
    </html>
  )
}

