"use client";
import React, { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import Image from "next/image";
import { MultiStepForm } from "@/components/ui/multi-step-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Banner = () => (
  <Image
    src="/mod-form-banner.png"
    alt="Staff Application Banner"
    width={800}
    height={200}
    className="rounded-t-xl w-full object-cover"
  />
);

export default function Page() {
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    understand: false,
    country: "",
    contributionTime: "",
    age: "",
    moderationDefinition: "",
    pastExperience: "",
    voiceChat: "",
    aboutYourself: "",
    serverImprovement: "",
    serviceDuration: "",
    staffViolation: "",
    botExperience: "",
    argumentScenario: "",
    otherServerExperience: "",
    whyQualified: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [id]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleRadioChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/forms/modration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful submission, e.g., show a success message or redirect
        alert("Application submitted successfully!");
      } else {
        // Handle errors
        alert("Failed to submit application.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred while submitting the application.");
    }
  };

  if (status === "loading") {
    return (
      <div className="container mx-auto py-12 text-center">Loading...</div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-black bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="container mx-auto py-12 flex flex-col items-center justify-center h-screen">
          <Card className="w-full max-w-md bg-white/10 backdrop-blur-sm border-gray-200/20 shadow-lg p-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                Authentication Required
              </CardTitle>
              <CardDescription className="text-center">
                Please sign in with Discord to access the staff application.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button onClick={() => signIn("discord")}>
                Sign In with Discord
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="container mx-auto py-12">
        <form onSubmit={handleSubmit}>
          <MultiStepForm>
            {/* Page 1: Information */}
            <CardContent className="p-0">
              <Banner />
              <div className="p-6 pt-0">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-center">
                    Among Us India Staff Applications
                  </CardTitle>
                  <CardDescription className="text-center text-gray-400">
                    Welcome! We appreciate your interest in joining our moderation
                    team.
                  </CardDescription>
                </CardHeader>
                {session?.user && (
                  <Card className="w-full max-w-2xl mx-auto mb-2 bg-white/5 border-gray-200/20">
                    <CardContent className="p-2 flex items-center space-x-4">
                      {session.user.image && (
                        <Image
                          src={session.user.image}
                          alt={session.user.name || "User avatar"}
                          width={32}
                          height={32}
                          className="rounded-full border-2 border-gray-200/50"
                        />
                      )}
                      <div>
                        <p className="font-bold text-l">{session.user.name}</p>
                        <p className="text-sm text-gray-400">
                          {" "}
                          {session.user.userId}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}
                <div className="space-y-6 text-white">
                  <div className="p-4 bg-white/5 rounded-lg border border-gray-200/20">
                    <p className="font-semibold text-lg mb-3">
                      Important Information:
                    </p>
                    <div className="space-y-3">
                      {[
                        "Please ensure you are genuinely interested in a staff position before applying.",
                        "Complete the application accurately and thoroughly.",
                        "Experience is valued, but not required. We encourage all interested candidates to apply.",
                        "We are looking for serious applicants dedicated to contributing to our community.",
                        "This is a volunteer role, and there is no monetary compensation.",
                      ].map((text, i) => (
                        <div key={i} className="flex items-start space-x-3">
                          <CheckCircle2 className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                          <p className="text-gray-300">{text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg border border-gray-200/20">
                    <p className="font-semibold text-lg">Please Read Carefully</p>
                    <p className="text-sm mt-2 text-gray-300">
                      This is a volunteer moderator position. Your role will involve
                      handling highly graphic content (images and text), including
                      but not limited to violence, self-harm, and hate speech.
                      Moderators may also face threats and harassment. This is a
                      serious responsibility that requires maturity and resilience,
                      not just a title. While challenging, it can be a rewarding
                      experience.
                    </p>
                    <div className="flex items-center space-x-2 mt-4">
                      <Checkbox
                        id="understand"
                        required
                        checked={formData.understand}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({
                            ...prev,
                            understand: !!checked,
                          }))
                        }
                      />
                      <Label
                        htmlFor="understand"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I have read and understood the responsibilities of this
                        role.
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>

            {/* Page 2: Questions */}
            <CardContent className="p-0">
              <Banner />
              <div className="p-6 pt-0">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-center">
                    Staff Applications
                  </CardTitle>
                </CardHeader>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="country">
                      What country do you currently reside in?
                    </Label>
                    <Input
                      id="country"
                      placeholder="e.g. India"
                      required
                      value={formData.country}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contributionTime">
                      What is your suitable time to contribute to the server?
                    </Label>
                    <Input
                      id="contributionTime"
                      placeholder="e.g. 8 PM - 11 PM IST"
                      required
                      value={formData.contributionTime}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">What is your age?</Label>
                    <Input
                      id="age"
                      placeholder="e.g. 18"
                      type="number"
                      required
                      value={formData.age}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="moderationDefinition">
                      Describe in your own words what it means to be a moderator and
                      what moderation entails?
                    </Label>
                    <Textarea
                      id="moderationDefinition"
                      placeholder="Your detailed answer"
                      required
                      value={formData.moderationDefinition}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pastExperience">
                      Please describe any past moderation or leadership experience you
                      feel is relevant?
                    </Label>
                    <Textarea
                      id="pastExperience"
                      placeholder="Your detailed answer"
                      required
                      value={formData.pastExperience}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Are you able to regularly voice chat?</Label>
                    <p className="text-sm text-gray-400">
                      We regularly hold meetings through VC discussing moderation and
                      often have our training sessions done via voice chat.
                    </p>
                    <RadioGroup
                      required
                      value={formData.voiceChat}
                      onValueChange={(value) =>
                        handleRadioChange("voiceChat", value)
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="vc-yes" />
                        <Label htmlFor="vc-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="vc-no" />
                        <Label htmlFor="vc-no">No</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="listen-only" id="vc-listen" />
                        <Label htmlFor="vc-listen">Listen in only (muted)</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="aboutYourself">
                      Tell us about yourself, if you’d like!
                    </Label>
                    <Textarea
                      id="aboutYourself"
                      placeholder="Your answer (optional, but helps us know you better!)"
                      value={formData.aboutYourself}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="serverImprovement">
                      What is something you would like to see improved within the
                      server?
                    </Label>
                    <p className="text-sm text-gray-400">
                      This could be something in our rules, the channels, roles, bots
                      etc.
                    </p>
                    <Textarea
                      id="serverImprovement"
                      placeholder="Your detailed answer"
                      required
                      value={formData.serverImprovement}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="serviceDuration">
                      For how long will you be able to provide service in moderation
                      before taking any sort of major break or completely step down?
                    </Label>
                    <Textarea
                      id="serviceDuration"
                      placeholder="e.g., 6 months, 1 year, indefinitely"
                      required
                      value={formData.serviceDuration}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </CardContent>

            {/* Page 3: Moderation Scenarios */}
            <CardContent className="p-0">
              <Banner />
              <div className="p-6 pt-0">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-center">
                    Moderation Scenarios
                  </CardTitle>
                  <CardDescription className="text-center">
                    For the following scenarios, describe what action you would take.
                    You can decide that no action should be taken or decide that a
                    user should be warned, temporarily muted, temporarily banned, or
                    permanently banned. Don't overthink these. The goal is to see your
                    thought process more than which you choose.
                  </CardDescription>
                </CardHeader>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="staffViolation">
                      If a staff member above you or alongside you, is violating the
                      rules what do you do in that situation?
                    </Label>
                    <Textarea
                      id="staffViolation"
                      placeholder="Your detailed answer"
                      required
                      value={formData.staffViolation}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>How experienced are you with using Discord bots?</Label>
                    <RadioGroup
                      className="px-6"
                      required
                      value={formData.botExperience}
                      onValueChange={(value) =>
                        handleRadioChange("botExperience", value)
                      }
                    >
                      <div className="flex justify-between">
                        <Label>Very Poor</Label>
                        <Label>Very Familiar</Label>
                      </div>
                      <div className="flex items-center justify-between space-x-2">
                        {[1, 2, 3, 4, 5].map((value: any) => (
                          <div
                            key={value}
                            className="flex flex-col items-center space-y-1"
                          >
                            <Label htmlFor={`bot-xp-${value}`}>{value}</Label>
                            <RadioGroupItem
                              value={String(value)}
                              id={`bot-xp-${value}`}
                            />
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="argumentScenario">
                      Two members are arguing in a public chatroom. What do you do?
                      Please list all steps.
                    </Label>
                    <Textarea
                      id="argumentScenario"
                      placeholder="Your detailed answer"
                      required
                      value={formData.argumentScenario}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="otherServerExperience">
                      What is your experience moderating other Discord servers?
                    </Label>
                    <p className="text-sm text-gray-400">
                      Include your level of authority (e.g. helper/mod/admin) and an
                      approximate number of people on the server(s). Be sure to
                      describe your activities as a moderator in detail. Please leave
                      an invite to the server(s) in question if you can. Type "none"
                      if you have no moderation experience on other discord servers
                    </p>
                    <Textarea
                      id="otherServerExperience"
                      placeholder="Your detailed answer"
                      required
                      value={formData.otherServerExperience}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="whyQualified">
                      Why do you feel qualified for/want to be on the server
                      moderation team?
                    </Label>
                    <p className="text-sm text-gray-400">
                      What makes you a good candidate for moderator overall? How much
                      experience do you have with the game? What is motivating you to
                      fill out this form right now?
                    </p>
                    <Textarea
                      id="whyQualified"
                      placeholder="Your detailed answer"
                      required
                      value={formData.whyQualified}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </MultiStepForm>
        </form>
      </div>
    </div>
  );
}
