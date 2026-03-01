/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: birthplacestatistics
 * Interface for BirthplaceStatistics
 */
export interface BirthplaceStatistics {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType number */
  statisticValue?: number;
  /** @wixFieldType text */
  label?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  icon?: string;
  /** @wixFieldType text */
  unit?: string;
  /** @wixFieldType text */
  description?: string;
}


/**
 * Collection ID: foundationdevelopment
 * Interface for FoundationDevelopment
 */
export interface FoundationDevelopment {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  yearPeriod?: string;
  /** @wixFieldType text */
  heading?: string;
  /** @wixFieldType text */
  content?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  image?: string;
  /** @wixFieldType text */
  quote?: string;
}


/**
 * Collection ID: gallery
 * Interface for Gallery
 */
export interface Gallery {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  image?: string;
  /** @wixFieldType text */
  caption?: string;
  /** @wixFieldType number */
  displayOrder?: number;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType datetime */
  dateAdded?: Date | string;
}


/**
 * Collection ID: herosectioncontent
 * Interface for HeroSectionContent
 */
export interface HeroSectionContent {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  subtitle?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  backgroundImage?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType text */
  ctaText?: string;
  /** @wixFieldType url */
  ctaUrl?: string;
}


/**
 * Collection ID: navigationitems
 * Interface for NavigationItems
 */
export interface NavigationItems {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  label?: string;
  /** @wixFieldType text */
  sectionAnchorId?: string;
  /** @wixFieldType number */
  order?: number;
  /** @wixFieldType boolean */
  isActive?: boolean;
  /** @wixFieldType url */
  url?: string;
}


/**
 * Collection ID: upcomingevents
 * Interface for UpcomingEvents
 */
export interface UpcomingEvents {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  eventName?: string;
  /** @wixFieldType date */
  eventDate?: Date | string;
  /** @wixFieldType time */
  eventTime?: any;
  /** @wixFieldType text */
  eventLocation?: string;
  /** @wixFieldType text */
  eventDescription?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  eventImage?: string;
}
