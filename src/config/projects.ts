// projects
export const projectHeadLine = "What I've done and what I'm doing."
export const projectIntro = "I've worked on a variety of projects, from simple websites to complex web applications. And many of them are open-source. Here are a few of my favorites."

export type ProjectItemType = {
    name: string
    description: string
    link: { href: string, label: string }
    date?: string
    logo?: string,
    category?: string[],
    tags?: string[],
    image?: string,
    techStack?: string[],
    gitStars?: number,
    gitForks?: number
  }
  
  // projects 
  export const projects: Array<ProjectItemType> = [
    {
      name: 'Moodie Movie',
      description:
        'Moodie Movies is a movie recommendation website that recommends movies based on your mood.',
      link: { href: 'moodiemovie.top', label: 'Moodie Movie' },
      category: ['Website'],
      techStack: ['Next.js', 'TailwindCSS', 'Shadcn/UI'],
      tags: ['Movie Recommendation', 'Moodie Movies']
    },
  ]
  
  export const githubProjects: Array<ProjectItemType> = [
    // {
    //   name: 'Devtoolset',
    //   description: 'Open-source & database-free developer tools navigator / 开源无数据库配置的开发者工具导航站',
    //   link: { href: 'github.com/iAmCorey/devtoolset', label: 'Devtoolset' },
    //   gitStars: 203,
    //   gitForks: 67
    // },
  
  ]
  