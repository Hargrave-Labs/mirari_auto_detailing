import { defineField, defineType } from 'sanity'
import { ServiceCheckboxes } from './components/ServiceCheckboxes'

export const portfolio = defineType({
    name: 'portfolio',
    title: 'Portfolio Item',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (rule) => rule.required(),
            description: 'E.g., "Full Detail on Tesla Model 3"',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'mediaType',
            title: 'Media Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Photo Gallery', value: 'photos' },
                    { title: 'Video Reel', value: 'video' },
                ],
                layout: 'radio',
            },
            initialValue: 'photos',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'mainImage',
            title: 'Main Image / Thumbnail',
            type: 'image',
            options: {
                hotspot: true,
            },
            description: 'Used as the thumbnail on the portfolio grid. Good for video thumbnails as well.',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'gallery',
            title: 'Photo Gallery',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
            hidden: ({ document }) => document?.mediaType !== 'photos',
            description: 'Upload multiple before/after shots or detail photos.',
        }),
        defineField({
            name: 'videoUrl',
            title: 'Video / Reel URL',
            type: 'url',
            hidden: ({ document }) => document?.mediaType !== 'video',
            description: 'Link to an Instagram Reel, TikTok, or YouTube Short.',
        }),
        defineField({
            name: 'videoFile',
            title: 'Video File Upload',
            type: 'file',
            options: {
                accept: 'video/mp4,video/quicktime',
            },
            hidden: ({ document }) => document?.mediaType !== 'video',
            description: 'Alternatively, upload a raw portrait video file directly.',
        }),
        defineField({
            name: 'servicesRendered',
            title: 'Services Rendered',
            type: 'array',
            of: [{ type: 'reference', to: { type: 'service' } }],
            components: {
                input: ServiceCheckboxes
            }
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            description: 'A brief write-up about the vehicle and the work performed.',
        }),
        defineField({
            name: 'completedAt',
            title: 'Completion Date',
            type: 'date',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'mainImage',
            mediaType: 'mediaType',
        },
        prepare({ title, media, mediaType }) {
            return {
                title,
                subtitle: mediaType === 'video' ? '🎬 Video Reel' : '📸 Photo Gallery',
                media,
            }
        },
    },
})
