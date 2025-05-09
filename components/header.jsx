"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation"

// Using .jsx extension to avoid TypeScript errors completely
export default function Header() {
  const pathname = usePathname()

  // Format the pathname for breadcrumbs
  const formatPathname = (path) => {
    if (path === "/") return "Dashboard"
    return path
      .split("/")
      .pop()
      ?.split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  // Generate breadcrumb items
  const generateBreadcrumbs = () => {
    const paths = pathname.split("/").filter(Boolean)

    // If we're in a project context
    if (paths[0] === "projects" && paths.length > 1) {
      return [
        { href: "/", label: "Projects" },
        { href: `/projects/${paths[1]}`, label: getProjectName(paths[1]) },
        ...paths.slice(2).map((path, i) => ({
          href: `/${paths.slice(0, i + 3).join("/")}`,
          label: formatPathname(`/${path}`) || "",
        })),
      ]
    }

    // Default breadcrumbs
    return [
      { href: "/", label: "Projects" },
      ...paths.map((path, i) => ({
        href: `/${paths.slice(0, i + 1).join("/")}`,
        label: formatPathname(`/${path}`) || "",
      })),
    ]
  }

  // Get project name from ID
  const getProjectName = (id) => {
    const projects = {
      "bio-technology-show": "Bio Technology Show",
      "arab-biotech-summit": "Arab BioTech Summit",
      "dubai-ev-show": "Dubai EV Show",
      "gemtech-forum": "Gemtech Forum",
      "climate-technology-show": "Climate Technology Show",
      "london-ev-show": "London EV Show",
      rakis: "RAKIS",
      "world-hydrogen-forum": "World Hydrogen Forum",
    }

    return projects[id] || id
  }

  const breadcrumbs = generateBreadcrumbs()

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 border-b bg-background">
      <div className="flex items-center space-x-4">
        <Breadcrumb>
          {breadcrumbs.map((crumb, i) => (
            <BreadcrumbItem key={i}>
              <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm">
          2025
        </Button>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Maxpo</span>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@username" />
            <AvatarFallback>M</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
