"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

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
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

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
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedRequest(request)
                            setIsDialogOpen(true)
                          }}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedRequest(request)
                            setIsDetailDialogOpen(true)
                          }}
                        >
                          Detail View
                        </Button>
                      </div>

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
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deposit Request Details</DialogTitle>
          </DialogHeader>
          {selectedRequest && <DepositDetailView request={selectedRequest} />}
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
      <div className="space-y-2 pr-4">
        <DetailItem label="Username" value={request.username} />
        <DetailItem label="Amount" value={`${request.amount} ETB`} />
        <DetailItem label="Date" value={request.date} />
        <DetailItem label="Receipt">
          <div className="w-52 h-72 relative">
          <img
            src={request.receipt || "/placeholder.svg"}
            alt="Receipt"
            fill
            className="object-contain rounded-md"
            style={{ objectFit: 'contain' }}
          />
          </div>
        </DetailItem>
        <div className="flex space-x-2">
          <Button onClick={() => onApprove(request.id)}>Approve</Button>
          <Button variant="outline" onClick={() => onReject(request.id, rejectionReason)}>
            Reject
          </Button>
        </div>
        <div>
          <Label htmlFor="rejectionReason" className="text-sm">Rejection Reason</Label>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            placeholder="Enter reason for rejection"
          />
        </div>
      </div>
    </ScrollArea>
  )
}

const DetailItem = ({ label, value, children }: { label: string; value?: string; children?: React.ReactNode }) => (
  <div>
    <Label className="text-sm">{label}</Label>
    <p className="text-gray-600">{value || children}</p>
  </div>
)

const DepositDetailView = ({ request }: { request: (typeof mockDepositRequests)[0] }) => (
  <ScrollArea className="h-[60vh]">
    <div className="space-y-2 pr-4">
      <DetailItem label="Username" value={request.username} />
      <DetailItem label="Amount" value={`${request.amount} ETB`} />
      <DetailItem label="Date" value={request.date} />
      <DetailItem label="Status" value={request.status} />
      <DetailItem label="Receipt">
        <div className="w-52 h-72 relative">
          <img
            src={request.receipt || "/placeholder.svg"}
            alt="Receipt"
            fill
            className="object-contain rounded-md"
            style={{ objectFit: 'contain' }}
          />
        </div>
      </DetailItem>
    </div>
  </ScrollArea>
)

