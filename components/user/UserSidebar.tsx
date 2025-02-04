"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, History, ArrowUpFromLine, ArrowDownToLine, Send, User, MessageSquare } from "lucide-react"

const navItems = [
  { name: "Dashboard", href: "/user/dashboard", icon: LayoutDashboard },
  { name: "Transactions", href: "/user/transactions", icon: History },
  { name: "Deposit", href: "/user/deposit", icon: ArrowUpFromLine },
  { name: "Withdraw", href: "/user/withdraw", icon: ArrowDownToLine },
  { name: "Send", href: "/user/send", icon: Send },
  { name: "Profile", href: "/user/profile", icon: User },
  { name: "Customer Support", href: "/user/support", icon: MessageSquare },
]

export default function UserSidebar() {
  const pathname = usePathname()

  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-700 transition-colors ${
              pathname === item.href ? "bg-gray-700" : ""
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}

