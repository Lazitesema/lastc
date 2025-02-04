"use client"

import { useState, useEffect, ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function EmailModulePage() {
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false);
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")

    // Placeholder for user data
    const users = [
        { id: 'user1', email: 'user1@example.com' },
        { id: 'user2', email: 'user2@example.com' },
        { id: 'user3', email: 'user3@example.com' },
        { id: 'user4', email: 'user4@example.com' },
        { id: 'user5', email: 'user5@example.com' },
        { id: 'user6', email: 'user6@example.com' },
        { id: 'user7', email: 'user7@example.com' },
        { id: 'user8', email: 'user8@example.com' },
      ];

  const handleSendEmail = (e: ChangeEvent) => {
    e.preventDefault()
    const recipients = selectAll ? 'All users' : selectedRecipients.join(", ")
    // TODO: Integrate with backend API to send email
    console.log("Sending email:", { recipients, subject, message })
    // Reset form
    setSelectedRecipients([])
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
            <div className="space-y-2">
                <Label>Recipients</Label>
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="selectAll"
                        checked={selectAll}
                        onCheckedChange={(checked) => {
                            setSelectAll(checked ?? false);
                            setSelectedRecipients(checked ? users.map(user => user.id) : []);
                        }}
                    />
                    <Label htmlFor="selectAll" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Select All Users
                    </Label>
                </div>
                <ScrollArea className="h-[150px] w-full rounded-md border">
                    <div className="p-4">
                        {users.map(user => (
                            <div key={user.id} className="flex items-center space-x-2 py-1">
                                <Checkbox
                                    id={user.id}
                                    checked={selectedRecipients.includes(user.id)}
                                    onCheckedChange={(checked) => {
                                        setSelectedRecipients(checked ? [...selectedRecipients, user.id] : selectedRecipients.filter(id => id !== user.id));
                                    }}
                                />
                                <Label htmlFor={user.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{user.email}</Label>
                            </div>
                        ))}
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
       {/* Update selectedRecipients when selectAll changes */}
       {useEffect(() => {
        if (selectAll) {
            setSelectedRecipients(users.map(user => user.id));
        } else {
            setSelectedRecipients([]);
        }
    }, [selectAll])}
    </div>
  )
}
