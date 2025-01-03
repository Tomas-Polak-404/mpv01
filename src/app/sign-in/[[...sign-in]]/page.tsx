import { SignIn } from '@clerk/nextjs'

export default function Page() {
    return (
      <div
        suppressHydrationWarning={true}
        className="h-[calc(100vh-96px)] flex items-center justify-center"
      >
        <SignIn />
      </div>
    );
}