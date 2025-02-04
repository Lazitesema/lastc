"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function EmailModulePage() {
  const [recipient, setRecipient] = useState("all")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Integrate with backend API to send email
    console.log("Sending email:", { recipient, subject, message })
    // Reset form
    setSubject("")
    setMessage("")
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Email Module</h1>

      <Card>
        <CardHeader>
          <CardTitle>Send Email</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSendEmail} className="space-y-4">
            <div>
              <Label htmlFor="recipient">Recipient</Label>
              <Select onValueChange={setRecipient} defaultValue={recipient}>
                <SelectTrigger id="recipient">
                  <SelectValue placeholder="Select recipient" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="individual">Individual User</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {recipient === "individual" && (
              <div>
                <Label htmlFor="email">User Email</Label>
                <Input id="email" type="email" placeholder="Enter user email" required />
              </div>
            )}
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter email subject"
                required
              />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter email message"
                required
                className="min-h-[200px]"
              />
            </div>
            <Button type="submit">Send Email</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

