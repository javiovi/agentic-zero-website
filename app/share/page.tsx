import { ShareJsonLd } from '@/components/share-json-ld'
import { SiteNav } from '@/components/site-nav'
import { SiteFooter } from '@/components/site-footer'
import { pageMetadata } from '@/lib/page-metadata'
import ShareCard from './share-card'
import styles from './share.module.css'

export const metadata = pageMetadata({
  title: 'I’m attending Agentic Zero — Make your card',
  description: 'Make your Agentic Zero attendee card. Add your photo or X handle and export a JPG for October 7, 2026 in San Francisco.',
  path: '/share',
})

export default function SharePage() {
  return <>
    <ShareJsonLd />
    <SiteNav />
    <div className="page-container az-v2-page az-v2-inner-page">
      <main className={styles.page}>
        <header className={styles.heading}>
          <h1>See you at <span>Agentic Zero.</span></h1>
          <p>Make your attendee card. Let your people know you’ll be there.</p>
        </header>
        <ShareCard />
      </main>
      <SiteFooter />
    </div>
  </>
}
