import { HeroBanner } from '@/components/hero-banner';
import { HeroIntro } from '@/components/hero-intro';
import { GitHubRepos } from '@/components/github-repos';
import { GitHubHeatmap } from '@/components/github-heatmap';
import { SkillsSection } from '@/components/skills-section';
import { SectionWrapper } from '@/components/section-wrapper';
import { Reveal } from '@/components/reveal';
import { fetchPinnedRepos, fetchContributions } from '@/lib/github';
import { FrostedCard } from '@/components/frosted-card';

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
      <div className="w-full max-w-2xl mx-auto px-5 md:px-8">
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
      <div className="w-full max-w-2xl mx-auto px-5 md:px-8">
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
      <div className="w-full max-w-2xl mx-auto px-5 md:px-8">
        <div className="h-px w-full" style={{ background: 'var(--border)' }} />
      </div>

      {/* Skills */}
      <SectionWrapper id="skills" label="03" title="Skills">
        <SkillsSection />
      </SectionWrapper>

      {/* Divider */}
      <div className="w-full max-w-2xl mx-auto px-5 md:px-8">
        <div className="h-px w-full" style={{ background: 'var(--border)' }} />
      </div>

      {/* Projects */}
      <SectionWrapper id="projects" label="04" title="Projects">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {repos.map((repo, i) => (
            <Reveal key={repo.name} delay={i * 0.05}>
              <a
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group h-full"
              >
                <FrostedCard className="h-full group-hover:border-[var(--border-hover)]">
                  <div className="flex items-start justify-between mb-2">
                    <h3
                      className="text-[15px] font-medium transition-colors duration-200 group-hover:text-[var(--accent)]"
                      style={{ color: 'var(--text)', fontFamily: 'var(--font-serif)' }}
                    >
                      {repo.name.replace(/-/g, ' ')}
                    </h3>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="flex-shrink-0 mt-0.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                      style={{ color: 'var(--text-tertiary)' }}
                    >
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </div>

                  {repo.description && (
                    <p
                      className="text-[13px] leading-relaxed mb-4"
                      style={{ color: 'var(--text-secondary)', lineHeight: '1.65' }}
                    >
                      {repo.description}
                    </p>
                  )}

                  <div className="flex items-center gap-4 mt-auto">
                    {repo.primaryLanguage && (
                      <span className="flex items-center gap-1.5 text-[12px]" style={{ color: 'var(--text-tertiary)' }}>
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ background: repo.primaryLanguage.color }}
                        />
                        {repo.primaryLanguage.name}
                      </span>
                    )}
                  </div>
                </FrostedCard>
              </a>
            </Reveal>
          ))}
        </div>
      </SectionWrapper>
    </>
  );
}
