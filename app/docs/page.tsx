import Content from './content.mdx'

export default async function Docs() {
  return (
    <div className="pt-16">
      <article className="prose">
        <Content />
      </article>
    </div>
  )
}
