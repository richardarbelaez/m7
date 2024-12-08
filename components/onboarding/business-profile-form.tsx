"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { useProfileStore } from "@/lib/stores/profile-store"

const businessProfileSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  industry: z.string().min(2, "Industry must be at least 2 characters"),
  size: z.string().min(1, "Please select your company size"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  goals: z.string().min(10, "Goals must be at least 10 characters")
})

type BusinessProfileSchema = z.infer<typeof businessProfileSchema>

export function BusinessProfileForm() {
  const router = useRouter()
  const { toast } = useToast()
  const { setProfile, updateProfile } = useProfileStore()
  
  const form = useForm<BusinessProfileSchema>({
    resolver: zodResolver(businessProfileSchema),
    defaultValues: {
      companyName: "",
      industry: "",
      size: "",
      description: "",
      goals: ""
    }
  })

  async function onSubmit(data: BusinessProfileSchema) {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('No user found')

      const profile = {
        id: user.id,
        ...data,
        onboardingCompleted: false
      }

      await updateProfile(profile)
      
      toast({
        title: "Profile Created",
        description: "Your business profile has been saved successfully."
      })
      
      router.push("/onboarding/departments")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save business profile",
        variant: "destructive"
      })
    }
  }

  // Rest of the form JSX remains the same
}