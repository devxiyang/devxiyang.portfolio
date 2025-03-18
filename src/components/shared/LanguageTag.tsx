export function LanguageTag({ language }: { language?: string }) {
  const isEnglish = language === 'en';
  
  return (
    <span className={`
      inline-flex items-center justify-center 
      rounded-full px-1.5 py-0 text-xs font-medium 
      ${isEnglish 
        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' 
        : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'}
      ml-1.5 text-[10px] leading-[14px] min-w-[18px] text-center
    `}>
      {isEnglish ? 'En' : 'Zh'}
    </span>
  )
} 