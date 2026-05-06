import { defineArrayMember, defineField, defineType } from "sanity";

export const artworkType = defineType({
  name: "artwork",
  title: "Artwork",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "published",
      title: "Published",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "artist",
      title: "Artist",
      type: "reference",
      to: [{ type: "artist" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
        }),
      ],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "mainSize",
      title: "Main size",
      type: "string",
      description: "Example: 180 x 120 cm",
    }),
    defineField({
      name: "sizes",
      title: "Available sizes",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "materials",
      title: "Materials",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: {
        list: ["Canvas", "Fine art print", "Framed canvas", "Optional acoustic panel version"],
      },
    }),
    defineField({
      name: "orientation",
      title: "Orientation",
      type: "string",
      options: {
        list: ["Horizontal", "Vertical", "Cuadrada"],
      },
    }),
    defineField({
      name: "style",
      title: "Style",
      type: "string",
      options: {
        list: ["Minimal", "Organico", "Geometrico", "Textural", "Atmosferico"],
      },
    }),
    defineField({
      name: "colors",
      title: "Color palette",
      type: "string",
    }),
    defineField({
      name: "palette",
      title: "Palette hex colors",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      description: "Used only as a fallback visual placeholder if no image exists.",
    }),
    defineField({
      name: "roomType",
      title: "Primary room type",
      type: "string",
      options: {
        list: ["Living room", "Bedroom", "Hotel lobby", "Restaurant", "Office"],
      },
    }),
    defineField({
      name: "suggestedRooms",
      title: "Suggested spaces",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: {
        list: ["Living room", "Bedroom", "Hotel lobby", "Restaurant", "Office"],
      },
    }),
    defineField({
      name: "priceLabel",
      title: "Price label",
      type: "string",
      initialValue: "Cotizar",
    }),
    defineField({
      name: "finish",
      title: "Finish",
      type: "string",
    }),
    defineField({
      name: "printing",
      title: "Printing quality",
      type: "string",
    }),
    defineField({
      name: "installation",
      title: "Installation type",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "artist.name",
      media: "mainImage",
    },
  },
});
