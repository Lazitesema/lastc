"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { ScrollArea } from "@/components/ui/scroll-area"

// Mock deposit requests data
const mockDepositRequests = [
  {
    id: 1,
    userId: 1,
    username: "johndoe",
    amount: 1000,
    status: "Pending",
    date: "2023-07-05",
    receipt: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 2,
    userId: 2,
    username: "janesmith",
    amount: 1500,
    status: "Approved",
    date: "2023-07-04",
    receipt: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 3,
    userId: 3,
    username: "bobjohnson",
    amount: 500,
    status: "Rejected",
    date: "2023-07-03",
    receipt: "/placeholder.svg?height=300&width=200",
  },
]

export default function DepositRequestsPage() {
  const [requests, setRequests] = useState(mockDepositRequests)
  const [selectedRequest, setSelectedRequest] = useState<(typeof mockDepositRequests)[0] | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleApprove = (requestId: number) => {
    // TODO: Integrate with backend API to approve deposit request
    setRequests(requests.map((request) => (request.id === requestId ? { ...request, status: "Approved" } : request)))
    setIsDialogOpen(false)
    // TODO: Send email notification to user
    console.log(`Approved deposit request ${requestId}`)
  }

  const handleReject = (requestId: number, reason: string) => {
    // TODO: Integrate with backend API to reject deposit request
    setRequests(requests.map((request) => (request.id === requestId ? { ...request, status: "Rejected" } : request)))
    setIsDialogOpen(false)
    // TODO: Send email notification to user
    console.log(`Rejected deposit request ${requestId} with reason: ${reason}`)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Deposit Requests</h1>

      <Card>
        <CardHeader>
          <CardTitle>Pending Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.username}</TableCell>
                  <TableCell>{request.amount} ETB</TableCell>
                  <TableCell>{request.date}</TableCell>
                  <TableCell>{request.status}</TableCell>
                  <TableCell>
                    {request.status === "Pending" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedRequest(request)
                          setIsDialogOpen(true)
                        }}
                      >
                        Review
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Review Deposit Request</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <DepositReviewForm request={selectedRequest} onApprove={handleApprove} onReject={handleReject} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function DepositReviewForm({
  request,
  onApprove,
  onReject,
}: {
  request: (typeof mockDepositRequests)[0]
  onApprove: (requestId: number) => void
  onReject: (requestId: number, reason: string) => void
}) {
  const [rejectionReason, setRejectionReason] = useState("")

  return (
    <ScrollArea className="h-[60vh]">
      <div className="space-y-4 pr-4">
        <div>
          <Label>Username</Label>
          <p>{request.username}</p>
        </div>
        <div>
          <Label>Amount</Label>
          <p>{request.amount} ETB</p>
        </div>
        <div>
          <Label>Date</Label>
          <p>{request.date}</p>
        </div>
        <div>
          <Label>Receipt</Label>
          <div className="mt-2">
            <Image
              src={request.receipt || "/placeholder.svg"}
              alt="Receipt"
              width={200}
              height={300}
              className="rounded-md"
            />
          </div>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => onApprove(request.id)}>Approve</Button>
          <Button
            variant="outline"
            onClick={() => {
              if (rejectionReason) onReject(request.id, rejectionReason)
            }}
          >
            Reject
          </Button>
        </div>
        <div>
          <Label htmlFor="rejectionReason">Rejection Reason</Label>
          <Input
            id="rejectionReason"
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            placeholder="Enter reason for rejection"
          />
        </div>
      </div>
    </ScrollArea>
  )
}

