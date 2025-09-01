"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { BookOpen, MessageSquare, Shield, ExternalLink, Download, Send } from "lucide-react"
import { useSearchParams } from "next/navigation"

export default function PlayerSupport() {
  const searchParams = useSearchParams()
  const defaultTab = searchParams.get("tab") || "resources"
  const [activeTab, setActiveTab] = useState(defaultTab)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-balance">Player Support</h1>
        <p className="text-muted-foreground">Menstrual Health & Wellbeing Resources</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="resources" className="flex items-center space-x-2">
            <BookOpen className="h-4 w-4" />
            <span>Resources</span>
          </TabsTrigger>
          <TabsTrigger value="request" className="flex items-center space-x-2">
            <MessageSquare className="h-4 w-4" />
            <span>Request Support</span>
          </TabsTrigger>
          <TabsTrigger value="feedback" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Feedback</span>
          </TabsTrigger>
        </TabsList>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Educational Resources */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span>Educational Resources</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Menstrual Health Guide</h4>
                      <p className="text-sm text-muted-foreground">Complete guide for female athletes</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Nutrition During Periods</h4>
                      <p className="text-sm text-muted-foreground">Dietary recommendations</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Managing Pain & Performance</h4>
                      <p className="text-sm text-muted-foreground">Training adjustments guide</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Local Resources */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ExternalLink className="h-5 w-5 text-accent" />
                  <span>Local Resources</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Ghana Health Service</h4>
                    <p className="text-sm text-muted-foreground mb-2">National health information and services</p>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit Website
                    </Button>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Menstrual Hygiene NGOs</h4>
                    <p className="text-sm text-muted-foreground mb-2">Local organizations providing support</p>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Find Organizations
                    </Button>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Emergency Contacts</h4>
                    <p className="text-sm text-muted-foreground mb-2">24/7 health support hotlines</p>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Contacts
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Request Support Tab */}
        <TabsContent value="request" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Request Support</CardTitle>
              <p className="text-sm text-muted-foreground">
                Submit a confidential request for supplies, medical support, or schedule adjustments.
              </p>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="request-type">Type of Request</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select request type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="supplies">Sanitary Supplies</SelectItem>
                      <SelectItem value="medical">Medical Support</SelectItem>
                      <SelectItem value="schedule">Schedule Adjustment</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="urgency">Urgency Level</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - Within a week</SelectItem>
                      <SelectItem value="medium">Medium - Within 2-3 days</SelectItem>
                      <SelectItem value="high">High - Within 24 hours</SelectItem>
                      <SelectItem value="urgent">Urgent - Immediate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Details</Label>
                  <Textarea
                    id="notes"
                    placeholder="Please provide details about your request..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-4">
                  <Label>Preferred Contact Method</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="doctor" />
                      <Label htmlFor="doctor">GFA Medical Officer</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="welfare" />
                      <Label htmlFor="welfare">Club Welfare Officer</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="confidential" />
                      <Label htmlFor="confidential">Confidential/Anonymous</Label>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="privacy" />
                  <Label htmlFor="privacy" className="text-sm">
                    I understand this request will be handled confidentially according to GFA privacy policies.
                  </Label>
                </div>

                <Button type="submit" className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Submit Request
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Feedback Tab */}
        <TabsContent value="feedback" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Anonymous Feedback</CardTitle>
              <p className="text-sm text-muted-foreground">
                Share your experiences or report issues safely and anonymously.
              </p>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="feedback-type">Feedback Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select feedback type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="supply-shortage">Supply Shortage</SelectItem>
                      <SelectItem value="facility-issue">Facility Issue</SelectItem>
                      <SelectItem value="support-needed">Additional Support Needed</SelectItem>
                      <SelectItem value="positive">Positive Experience</SelectItem>
                      <SelectItem value="suggestion">Suggestion for Improvement</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="feedback-details">Details</Label>
                  <Textarea
                    id="feedback-details"
                    placeholder="Please share your feedback or describe the issue..."
                    className="min-h-[120px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="club-context">Club/Context (Optional)</Label>
                  <Input id="club-context" placeholder="Which club or context does this relate to?" />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="escalate" />
                  <Label htmlFor="escalate" className="text-sm">
                    Escalate to GFA Women's Desk for immediate attention
                  </Label>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <Shield className="h-4 w-4 inline mr-2" />
                    Your feedback is completely anonymous. No personal information is collected or stored.
                  </p>
                </div>

                <Button type="submit" className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Submit Feedback
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
