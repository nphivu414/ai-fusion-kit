import { App } from "@/lib/db";
import { AppSideBarItem } from "./AppSideBarItem";

type AppSideBarListProps = {
  apps: App[] | null;
}

export const AppSideBarList = ({ apps }: AppSideBarListProps) => {
  if (!apps?.length) {
    return (
      <div className='p-4'>No apps found</div>
    )
  }

  return (
    <ul>
      {apps.map((app) => {
        const { id, name, description, slug, logoUrl } = app
        return (
          <AppSideBarItem key={id} name={name} description={description} slug={slug} logoUrl={logoUrl} />
        )
      })}
    </ul>
  )
}