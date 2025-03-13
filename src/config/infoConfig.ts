export * from './projects'
export * from './friends'
export * from './changelog'
export * from './education'
export * from './career'
export * from './activity'


// personal info
export const name = 'Corey Chiu'
export const headline = 'Software engineer, Full-Stack web developer, and indie hacker.'
export const introduction = 'I’m Corey, a software engineer based in Shenzhen, China. I like coding, and building interesting things'
export const email = 'xxx@gmail.com'
export const githubUsername = 'iamcorey'

// about page
export const aboutMeHeadline = "I'm Corey Chiu, a software engineer based in Shenzhen, China."
export const aboutParagraphs = [
  "I love coding. I learned programming when I in college. I wrote my first program in Java when I was 18.",
  "I have a lot of hobbies, such as travelling, photography, watching movies, music and so on.",
  "I'm working as a software develop engineer in Shenzhen, China now. And I'm building a lot of side projects in my spare time."
]


// blog
export const blogHeadLine = "What I've thinking about."
export const blogIntro = "I've written something about AI, programming and life."


// social links
export type SocialLinkType = {
  name: string,
  ariaLabel?: string,
  icon: string,
  href: string
}

export const socialLinks: Array<SocialLinkType> = [
  {
    name: 'X',
    icon: 'x',
    href: 'https://x.com/realcoreychiu'
  },
  {
    name: 'Bsky',
    icon: 'bsky',
    href: 'https://bsky.app/profile/coreychiu.com'
  },
  {
    name: 'Jike',
    icon: 'pill',
    href: 'https://okjk.co/P7c1zU'
  },
  {
    name: 'Github',
    icon: 'github',
    href: 'https://github.com/iamcorey'
  },
  {
    name: 'Wechat',
    icon: 'wechat',
    href: 'https://mp.weixin.qq.com/s/DxnRgqNfgzXIhqj6w_x0dQ'
  },
  {
    name: 'Discord',
    icon: 'discord',
    href: 'https://discord.gg/xTxRg3Ej'
  },
  {
    name: 'Ko-fi',
    icon: 'coffee',
    href: 'https://ko-fi.com/coreychiu'
  }
]

// https://simpleicons.org/
export const techIcons = [
  "typescript",
  "javascript",
  "supabase",
  "cloudflare",
  "java",
  "oracle",
  "mysql",
  "react",
  "nodedotjs",
  "nextdotjs",
  "prisma",
  "postgresql",
  "nginx",
  "vercel",
  "docker",
  "git",
  "github",
  "visualstudiocode",
  "androidstudio",
  "ios",
  "apple",
  "wechat"
];



