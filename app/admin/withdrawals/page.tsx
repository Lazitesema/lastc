"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"

// Mock withdrawal requests data
const mockWithdrawalRequests = [
  {
    transactionId: "TXN001",
    id: 1,
    userId: 1,
    username: "johndoe",
    amount: 500,
    status: "Pending",
    date: "2023-07-05",
    bankName: "Bank of America",
    accountNumber: "1234567890",
    accountHolderName: "John Doe",
  },
  {
    transactionId: "TXN002",
    id: 2,
    userId: 2,
    username: "janesmith",
    amount: 1000,
    status: "Approved",
    date: "2023-07-04",
    bankName: "Chase",
    accountNumber: "9876543210",
    accountHolderName: "Jane Smith",
  },
  {
    transactionId: "TXN003",
    id: 3,
    userId: 3,
    username: "bobjohnson",
    amount: 750,
    status: "Rejected",
    date: "2023-07-03",
    bankName: "Wells Fargo",
    accountNumber: "5678901234",
    accountHolderName: "Bob Johnson",
  },
]

export default function WithdrawalRequestsPage() {
  const [requests, setRequests] = useState(mockWithdrawalRequests)
  const [selectedRequest, setSelectedRequest] = useState<(typeof mockWithdrawalRequests)[0] | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false)
  const handleApprove = (requestId: number, transactionDetails: string) => {
    // TODO: Integrate with backend API to approve withdrawal request
    setRequests(requests.map((request) => (request.id === requestId ? { ...request, status: "Approved" } : request)))
    setIsDialogOpen(false)
    // TODO: Send email notification to user
    console.log(`Approved request ${requestId} with details: ${transactionDetails}`)
  }

  const handleReject = (requestId: number, reason: string) => {
    // TODO: Integrate with backend API to reject withdrawal request
    setRequests(requests.map((request) => (request.id === requestId ? { ...request, status: "Rejected" } : request)))
    setIsDialogOpen(false)
    // TODO: Send email notification to user
    console.log(`Rejected request ${requestId} with reason: ${reason}`)
  }

  const openDetailView = (request: (typeof mockWithdrawalRequests)[0]) => {
    setSelectedRequest(request)
    setIsDetailViewOpen(true)
  }

  return (
    <>
      <h1 className="text-2xl font-bold">Withdrawal Requests</h1>

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
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openDetailView(request)}
                    >
                      Detail View
                    </Button>
                    {request.status === "Pending" &&
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedRequest(request)
                          setIsDialogOpen(true)
                       }}
                       className="ml-2"
                      >
                        Approve
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      </Card>

      {/* Approve/Reject Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Withdrawal Request</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <WithdrawalReviewForm request={selectedRequest} onApprove={handleApprove} onReject={handleReject} />
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={isDetailViewOpen} onOpenChange={setIsDetailViewOpen}>
          <DialogHeader>
            <DialogTitle>Review Withdrawal Request</DialogTitle>
          </DialogHeader>
          {selectedRequest && (
            <WithdrawalReviewForm request={selectedRequest} onApprove={handleApprove} onReject={handleReject} />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

function WithdrawalReviewForm({
  request,
  onApprove,
  onReject,
}: {
  request: (typeof mockWithdrawalRequests)[0]
  onApprove: (requestId: number, transactionDetails: string) => void
  onReject: (requestId: number, reason: string) => void
}) {
  const [transactionDetails, setTransactionDetails] = useState({
    transactionId: "",
    status: request.status,
    bankReference: "",
    processingDate: "",
    processingTime: "",
    notes: "",
  })
  const [rejectionReason, setRejectionReason] = useState("")

  const handleApprove = () => {
    const details = Object.entries(transactionDetails)
      .map(([key, value]) => `${key}: ${value}`)
      .join(", ")
    onApprove(request.id, details)
  }

  return (
    <ScrollArea className="h-[60vh]">
      <div className="space-y-4 pr-4">
         <div>
          <Label>Transaction ID</Label>
          <p>{request.transactionId}</p>
        </div>
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
          <Label>Bank Name</Label>
          <p>{request.bankName}</p>
        </div>
        <div>
          <Label>Account Number</Label>
          <p>{request.accountNumber}</p>
        </div>
        <div>
          <Label>Account Holder's Name</Label>
          <p>{request.accountHolderName}</p>
        </div>
        <div>
            <Label htmlFor="transactionId">Transaction ID</Label>
            {request.status === "Pending" ?(
              <Input
                id="transactionId"
                value={transactionDetails.transactionId}
                onChange={(e) => setTransactionDetails({ ...transactionDetails, transactionId: e.target.value })}
                placeholder="Enter transaction ID"
              />
            ):(
              <p>{transactionDetails.transactionId}</p>
            )}
          </div>
          <div>
            <Label htmlFor="bankReference">Bank Reference</Label>
            {request.status === "Pending" ?(
              <Input
                id="bankReference"
                value={transactionDetails.bankReference}
                onChange={(e) => setTransactionDetails({ ...transactionDetails, bankReference: e.target.value })}
                placeholder="Enter bank reference"
              />
            ):(
              <p>{transactionDetails.bankReference}</p>
            )}
          </div>
          <div>
            <Label htmlFor="processingDate">Processing Date</Label>
            {request.status === "Pending" ?(
              <Input
                id="processingDate"
                type="date"
                value={transactionDetails.processingDate}
                onChange={(e) => setTransactionDetails({ ...transactionDetails, processingDate: e.target.value })}
              />
            ):(
              <p>{transactionDetails.processingDate}</p>
            )}
          </div>
          <div>
            <Label htmlFor="processingTime">Processing Time</Label>
            {request.status === "Pending" ?(
              <Input
                id="processingTime"
                type="time"
                value={transactionDetails.processingTime}
                onChange={(e) => setTransactionDetails({ ...transactionDetails, processingTime: e.target.value })}
              />
            ):(
              <p>{transactionDetails.processingTime}</p>
            )}
          </div>
        {request.status === "Pending" &&
          <div className="flex space-x-2 mt-4">
          <Button onClick={handleApprove}>Approve</Button>
          <Button
            variant="outline"
            onClick={() => {
              if (rejectionReason) onReject(request.id, rejectionReason)
            }}
          >
            Reject
          </Button>
        </div>
        }
          <div>
            <Label htmlFor="notes">Notes</Label>
            {request.status === "Pending" ?(
              <Textarea
                id="notes"
                value={transactionDetails.notes}
                onChange={(e) => setTransactionDetails({ ...transactionDetails, notes: e.target.value })}
                placeholder="Enter any additional notes"
              />
            ):(
              <p>{transactionDetails.notes}</p>
            )}
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
