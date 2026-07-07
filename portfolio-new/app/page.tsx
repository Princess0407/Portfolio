import { HeroBanner } from '@/components/hero-banner';
import { HeroIntro } from '@/components/hero-intro';
import { GitHubRepos } from '@/components/github-repos';
import { GitHubHeatmap } from '@/components/github-heatmap';
import { SkillsSection } from '@/components/skills-section';
import { SectionWrapper } from '@/components/section-wrapper';
import { Reveal } from '@/components/reveal';
import { fetchPinnedRepos, fetchContributions } from '@/lib/github';

export default async function HomePage() {
  const [repos, contributions] = await Promise.all([
    fetchPinnedRepos(),
    fetchContributions(),
  ]);

  return (
    <>
      <HeroIntro />
      <HeroBanner />

      {/* Divider */}
      <div className="max-w-2xl mx-auto px-5 md:px-8">
        <div className="h-px w-full" style={{ background: 'var(--border)' }} />
      </div>

      {/* About */}
      <SectionWrapper id="about" label="01" title="About">
        <Reveal>
          <div
            className="space-y-4"
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-secondary)', lineHeight: '1.85' }}
          >
            <p>
              I am an engineer who finds joy in the places where software touches hardware.
              Most of my time goes into building systems that prioritize user sovereignty
              over convenience, whether that means running AI models on custom silicon or
              catching malicious code before it reaches your machine.
            </p>
            <p>
              Outside of code, I read too much, think about distributed systems more than
              is probably healthy, and occasionally write about the things I am learning. I
              believe that the best tools are the ones you can trust because you understand
              how they work.
            </p>
          </div>
        </Reveal>
      </SectionWrapper>

      {/* Divider */}
      <div className="max-w-2xl mx-auto px-5 md:px-8">
        <div className="h-px w-full" style={{ background: 'var(--border)' }} />
      </div>

      {/* GitHub */}
      <SectionWrapper id="github" label="02" title="GitHub">
        <Reveal>
          <p
            className="text-[13px] mb-6"
            style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}
          >
            pinned repositories from{' '}
            <a
              href="https://github.com/Princess0407"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200"
              style={{ color: 'var(--accent)' }}
            >
              @Princess0407
            </a>
          </p>
        </Reveal>
        <GitHubRepos repos={repos} />
        <GitHubHeatmap weeks={contributions} />
      </SectionWrapper>

      {/* Divider */}
      <div className="max-w-2xl mx-auto px-5 md:px-8">
        <div className="h-px w-full" style={{ background: 'var(--border)' }} />
      </div>

      {/* Skills */}
      <SectionWrapper id="skills" label="03" title="Skills">
        <SkillsSection />
      </SectionWrapper>

      {/* Divider */}
      <div className="max-w-2xl mx-auto px-5 md:px-8">
        <div className="h-px w-full" style={{ background: 'var(--border)' }} />
      </div>

      {/* Current Focus */}
      <SectionWrapper id="focus" label="04" title="Current Focus">
        <Reveal>
          <div className="space-y-5">
            <FocusItem
              title="The Intelligent Engine"
              description="Custom silicon for on-device AI inference. Currently hitting 12 tok/s on LLaMA-3.2-1B without any cloud dependency."
              status="in progress"
            />
            <FocusItem
              title="The Deceiver's Snare"
              description="Browser extension that flags malicious GitHub repositories before you clone them. Sandboxed execution with counterfeit dependency injection."
              status="in progress"
            />
          </div>
        </Reveal>
      </SectionWrapper>
    </>
  );
}

function FocusItem({ title, description, status }: { title: string; description: string; status: string }) {
  return (
    <div
      className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6 py-4 transition-all duration-200 group"
      style={{ borderBottom: '1px solid var(--border)' }}
    >
      <div className="flex-1">
        <h3
          className="text-[15px] font-medium mb-1 transition-colors duration-200 group-hover:text-[var(--accent)]"
          style={{ fontFamily: 'var(--font-serif)', color: 'var(--text)' }}
        >
          {title}
        </h3>
        <p className="text-[13px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {description}
        </p>
      </div>
      <span
        className="text-[11px] tracking-wider uppercase px-2.5 py-0.5 rounded-full flex-shrink-0 self-start"
        style={{
          color: 'var(--accent)',
          border: '1px solid var(--accent-dim)',
          fontFamily: 'var(--font-mono)',
        }}
      >
        {status}
      </span>
    </div>
  );
}
