import swaggerJsdoc from 'swagger-jsdoc';
// import { version } from "../../package.json" assert { type: "json" };
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the custom CSS file
// const customCss = fs.readFileSync(path.join(__dirname, 'swagger-ui.css'), 'utf8');

const options = {
    
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'VideoTube API Documentation',
      version: '1.0.0',
      description: 'API documentation for VideoTube application',
      contact: {
        name: 'API Support',
        email: 'support@videotube.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:8000',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
            type: 'object',
            required: ['username', 'email', 'fullName', 'password'],
            properties: {
              _id: {
                type: 'string',
                description: 'The auto-generated id of the user'
              },
              username: {
                type: 'string',
                description: 'The username of the user'
              },
              email: {
                type: 'string',
                description: 'The email of the user'
              },
              fullName: {
                type: 'string',
                description: 'The full name of the user'
              },
              avatar: {
                type: 'string',
                description: 'The avatar URL of the user'
              },
              coverImage: {
                type: 'string',
                description: 'The cover image URL of the user'
              },
              watchHistory: {
                type: 'array',
                items: {
                  type: 'string'
                },
                description: 'Array of video IDs watched by the user'
              },
              createdAt: {
                type: 'string',
                format: 'date-time',
                description: 'The date the user was created'
              },
              updatedAt: {
                type: 'string',
                format: 'date-time',
                description: 'The date the user was last updated'
              }
            }
          },
        Video: {
          type: 'object',
          required: ['title', 'description', 'videoFile', 'thumbnail'],
          properties: {
            _id: {
              type: 'string',
              description: 'The auto-generated id of the video'
            },
            title: {
              type: 'string',
              description: 'The title of the video'
            },
            description: {
              type: 'string',
              description: 'The description of the video'
            },
            videoFile: {
              type: 'string',
              description: 'The video file URL'
            },
            thumbnail: {
              type: 'string',
              description: 'The thumbnail image URL'
            },
            owner: {
              type: 'string',
              description: 'The ID of the user who owns the video'
            },
            isPublished: {
              type: 'boolean',
              description: 'Whether the video is published'
            },
            views: {
              type: 'number',
              description: 'Number of views on the video'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'The date the video was created'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'The date the video was last updated'
            }
          }
        },
        Comment: {
          type: 'object',
          required: ['content'],
          properties: {
            _id: {
              type: 'string',
              description: 'The auto-generated id of the comment'
            },
            content: {
              type: 'string',
              description: 'The content of the comment'
            },
            video: {
              type: 'string',
              description: 'The ID of the video the comment belongs to'
            },
            owner: {
              type: 'string',
              description: 'The ID of the user who made the comment'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'The date the comment was created'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'The date the comment was last updated'
            }
          }
        },
        Tweet: {
          type: 'object',
          required: ['content'],
          properties: {
            _id: {
              type: 'string',
              description: 'The auto-generated id of the tweet'
            },
            content: {
              type: 'string',
              description: 'The content of the tweet'
            },
            owner: {
              type: 'string',
              description: 'The ID of the user who created the tweet'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'The date the tweet was created'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'The date the tweet was last updated'
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Users',
        description: 'User management endpoints'
      },
      {
        name: 'Videos',
        description: 'Video management endpoints'
      },
      {
        name: 'Comments',
        description: 'Comment management endpoints'
      },
      {
        name: 'Subscriptions',
        description: 'Subscription management endpoints'
      },
      {
        name: 'Likes',
        description: 'Like management endpoints'
      },
      {
        name: 'Tweets',
        description: 'Tweet management endpoints'
      },
      {
        name: 'Dashboard',
        description: 'Dashboard and analytics endpoints'
      }
    ],
    security: [{
      bearerAuth: [],
    }],
  },
  apis: ['./src/routes/*.js'], // Path to the API routes
  // customCss, // Add custom CSS
  customSiteTitle: "Video Tube API Documentation",
  customfavIcon: "/favicon.ico",
};

export const specs = swaggerJsdoc(options); 