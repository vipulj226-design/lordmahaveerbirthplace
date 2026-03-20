/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: committee
 * Interface for CommitteeMembers
 */
export interface CommitteeMembers {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  name?: string;
  /** @wixFieldType text */
  role?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  memberImage?: string;
  /** @wixFieldType text */
  bio?: string;
  /** @wixFieldType url */
  linkedInUrl?: string;
  /** @wixFieldType date */
  joiningDate?: Date | string;
}


/**
 * Collection ID: eventyears
 * Interface for EventYears
 */
export interface EventYears {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType number */
  year?: number;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  coverImage?: string;
  /** @wixFieldType boolean */
  isActive?: boolean;
}


/**
 * Collection ID: foundationdevelopment
 * Interface for FoundationDevelopment
 */
export interface FoundationDevelopment {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  galleryImage3?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  galleryImage4?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  galleryImage2?: string;
  /** @wixFieldType text */
  yearPeriod?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  galleryImage1?: string;
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
  galleryImages?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  image10?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  image9?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  image8?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  image7?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  image6?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  image5?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  image4?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  galleryImagesBatch?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  image?: string;
  /** @wixFieldType number */
  year?: number;
  /** @wixFieldType text */
  pastEvent?: string;
  /** @wixFieldType text */
  caption?: string;
  /** @wixFieldType number */
  displayOrder?: number;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType datetime */
  dateAdded?: Date | string;
  /** @wixFieldType media_gallery */
  galleryNew?: any;
}


/**
 * Collection ID: gallerypageimages
 * Interface for GalleryPageImages
 */
export interface GalleryPageImages {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  image?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  altText?: string;
  /** @wixFieldType datetime */
  dateAdded?: Date | string;
  /** @wixFieldType text */
  category?: string;
}


/**
 * Collection ID: gallerysectionmenuimages
 * Interface for GallerySectionMenuImages
 */
export interface GallerySectionMenuImages {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  menuImage?: string;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType number */
  displayOrder?: number;
  /** @wixFieldType text */
  altText?: string;
  /** @wixFieldType boolean */
  isActive?: boolean;
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
 * Collection ID: pastevents
 * Interface for PastEvents
 */
export interface PastEvents {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  eventName?: string;
  /** @wixFieldType date */
  eventDate?: Date | string;
  /** @wixFieldType number */
  eventYear?: number;
  /** @wixFieldType text */
  location?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  coverImage?: string;
}


/**
 * Collection ID: spiritualleaders
 * Interface for SpiritualLeaders
 */
export interface SpiritualLeaders {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  leaderName?: string;
  /** @wixFieldType text */
  leaderTitle?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  leaderImage?: string;
  /** @wixFieldType text */
  leaderDescription?: string;
  /** @wixFieldType number */
  displayOrder?: number;
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
