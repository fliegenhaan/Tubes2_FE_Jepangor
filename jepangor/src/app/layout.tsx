import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Little Alchemy 2 Recipe Finder',
  description: 'Pencari resep untuk permainan Little Alchemy 2 menggunakan algoritma BFS dan DFS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}