import '@/app/globals.css'
import Header from './header'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header className="absolute top-4" />
      <main>{children}</main>
    </>
  )
}
