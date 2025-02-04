"use client"

import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Image from "next/image"

// Placeholder data for admin profile
const adminProfileData = {
  username: "adminuser123",
  firstName: "Admin",
  lastName: "User",
  email: "admin@cashora.com",
  role: "Super Admin",
  dateOfBirth: "1990-01-01",
  placeOfBirth: "Addis Ababa",
  residence: "Addis Ababa",
  nationality: "Ethiopian",
  lastLogin: "2023-07-05 14:30",
  idCard: "/placeholder.jpg", // Placeholder image
};

export default function AdminProfilePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Profile</h1>
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input id="username" value={adminProfileData.username} disabled />
            </div>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={`${adminProfileData.firstName} ${adminProfileData.lastName}`} disabled />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={adminProfileData.email} disabled />
            </div>
            <div>
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input id="dateOfBirth" value={adminProfileData.dateOfBirth} disabled />
            </div>
            <div>
              <Label htmlFor="placeOfBirth">Place of Birth</Label>
              <Input id="placeOfBirth" value={adminProfileData.placeOfBirth} disabled />
            </div>
            <div>
              <Label htmlFor="residence">Residence</Label>
              <Input id="residence" value={adminProfileData.residence} disabled />
            </div>
            <div>
              <Label htmlFor="nationality">Nationality</Label>
              <Input id="nationality" value={adminProfileData.nationality} disabled />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Input id="role" value={adminData.role} disabled />
            </div>
            <div>
              <Label htmlFor="lastLogin">Last Login</Label>
              <Input id="lastLogin" value={adminData.lastLogin} disabled />
            </div>
            <div>
              <Label htmlFor="idCard">ID Card</Label>
              <div className="w-64 h-40 relative">
                <Image src={adminProfileData.idCard} alt="ID Card" fill className="object-cover" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

