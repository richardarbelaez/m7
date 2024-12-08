"use client"

export interface User {
  id: string
  email: string
  role: string
}

// Simple mock auth service for development
export const authService = {
  async login(email: string, password: string): Promise<User | null> {
    // For development, always return the default user
    return {
      id: '2',
      email: 'user@mycompany.com',
      role: 'user'
    }
  },

  async getCurrentUser(): Promise<User | null> {
    // For development, always return the default user
    return {
      id: '2',
      email: 'user@mycompany.com',
      role: 'user'
    }
  },

  async logout(): Promise<void> {
    // No need to do anything for development
    return
  }
}