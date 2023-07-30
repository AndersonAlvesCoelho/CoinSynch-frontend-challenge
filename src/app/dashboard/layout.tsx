import HeaderDashboard from '@/components/HeaderDashboard'
import Sidebar from '@/components/Sidebar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[#F9F9F9]">
        <div className="flex flex-col h-screen ">
          <HeaderDashboard />
          <div className="flex flex-grow">
            <Sidebar />
            {children}
          </div>
          <div className="flex justify-center sticky bottom-0 py-6 w-full z-30 bg-white shadow-[0px_22px_70px_4px_rgba(0,0,0,0.2)]">
            <p className="text-text-base text-sm font-normal">
              Copyright © 2022 - All rights reserved
            </p>
          </div>
        </div>
      </body>
    </html>
  )
}
