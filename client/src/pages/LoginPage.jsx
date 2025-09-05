import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await login(email, password)
    
    if (!result.success) {
      setError(result.error)
    }
    
    setLoading(false)
  }

  return (
    <div className="flex flex-col h-screen w-screen text-center items-center justify-center gap-y-40 p-4 dark:bg-[#202020]">
      <div className="flex flex-col gap-y-4">
        <Card className="p-8 text-5xl bg-black text-amber-400 outline-none border-none shadow-[10px_10px_0px_#ffba00] rounded-3xl lg:text-7xl md:text-6xl dark:text-[#758aef] dark:shadow-[10px_10px_0px_#758aef]">
          <h1 className="font-bold">Welcome to YAPPIE 🧠🗣️</h1>
        </Card>
        <Card className="p-4 text-xl outline-none border-none shadow-none bg-transparent">
          <h6>{"(you've made a terrible decision. but hey, let's chat.)"}</h6>
        </Card>
      </div>

      <Card className="w-full max-w-md p-8 bg-white dark:bg-[#333333] shadow-[10px_10px_0px_#ffba00] dark:shadow-[10px_10px_0px_#758aef] rounded-3xl">
        <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">Sign In</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </div>
          
          <div>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full p-4 bg-black text-white shadow-[7px_7px_0px_#ffba00] hover:shadow-[7px_7px_0px_#fcbe19] hover:bg-neutral-700 rounded-3xl transition-all duration-150 dark:shadow-[7px_7px_0px_#758aef]"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </Card>
    </div>
  )
}