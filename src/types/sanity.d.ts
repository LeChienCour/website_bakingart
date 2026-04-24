/**
 * Shared Sanity type definitions.
 * Detailed document types will be co-located with their feature modules
 * or generated via `sanity typegen generate` as schemas grow.
 */

import type { Image } from "sanity";

/** Re-export for convenience so consumers don't need to import from "sanity" directly. */
export type { Image as SanityImage };

/** A resolved Sanity image asset with an alt text field. */
export interface SanityImageWithAlt {
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

/** Generic Sanity document base fields. */
export interface SanityDocument {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
}
