/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: aboutus
 * Interface for AboutUs
 */
export interface AboutUs {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  sectionTitle?: string;
  /** @wixFieldType text */
  introText?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  statueImage?: string;
  /** @wixFieldType text */
  statueDescription?: string;
  /** @wixFieldType url */
  learnMoreUrl?: string;
  /** @wixFieldType date */
  acquisitionDate?: Date | string;
}


/**
 * Collection ID: accommodationoptions
 * Interface for AccommodationOptions
 */
export interface AccommodationOptions {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  name?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  address?: string;
  /** @wixFieldType text */
  phoneNumber?: string;
  /** @wixFieldType url */
  websiteUrl?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  mainImage?: string;
  /** @wixFieldType text */
  priceRange?: string;
  /** @wixFieldType url */
  bookingLink?: string;
}


/**
 * Collection ID: bankdetails
 * Interface for BankDetails
 */
export interface BankDetails {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  bankName?: string;
  /** @wixFieldType text */
  accountNumber?: string;
  /** @wixFieldType text */
  ifscCode?: string;
  /** @wixFieldType text */
  branchName?: string;
  /** @wixFieldType text */
  accountHolderName?: string;
}


/**
 * Collection ID: blessings
 * Interface for Blessings
 */
export interface Blessings {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  content?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  blessingImage?: string;
  /** @wixFieldType text */
  author?: string;
  /** @wixFieldType date */
  blessingDate?: Date | string;
}


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
}


/**
 * Collection ID: heritagesites
 * Interface for HeritageSites
 */
export interface HeritageSites {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  mainImage?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  location?: string;
  /** @wixFieldType number */
  yearEstablished?: number;
  /** @wixFieldType url */
  moreInfoUrl?: string;
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
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  eventImage3?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  eventGalleryImages?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  eventImages?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  eventImage5?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  eventImage4?: string;
  /** @wixFieldType text */
  eventName?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  eventImage2?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  eventGallery?: string;
  /** @wixFieldType date */
  eventDate?: Date | string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  coverImage?: string;
  /** @wixFieldType text */
  location?: string;
  /** @wixFieldType url */
  eventUrl?: string;
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
 * Collection ID: transportmodes
 * Interface for TransportModes
 */
export interface TransportModes {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  modeName?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  modeImage?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  estimatedTravelTime?: string;
  /** @wixFieldType text */
  averageCost?: string;
  /** @wixFieldType url */
  bookingUrl?: string;
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
