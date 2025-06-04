// src/cloudinary/cloudinary.service.ts
import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, ConfigOptions } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
    constructor() {
        const config: ConfigOptions = {
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        };

        cloudinary.config(config);
    }

    async uploadImageFromUrl(url: string, publicId: string) {
        try {
            const result = await cloudinary.uploader.upload(url, {
                public_id: publicId,
            });
            return result;
        } catch (error) {
            console.error('Upload error:', error);
            throw error;
        }
    }

    generateOptimizedUrl(publicId: string): string {
        return cloudinary.url(publicId, {
            fetch_format: 'auto',
            quality: 'auto',
        });
    }

    generateAutoCropUrl(publicId: string): string {
        return cloudinary.url(publicId, {
            crop: 'auto',
            gravity: 'auto',
            width: 500,
            height: 500,
        });
    }

    async uploadImageFromBuffer(file: Express.Multer.File): Promise<any> {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: 'posts',
                    resource_type: 'image',
                },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                },
            );

            // Convertir el buffer a un stream y pasarlo al upload_stream de Cloudinary
            const readable = new Readable();
            readable.push(file.buffer);
            readable.push(null);
            readable.pipe(uploadStream);
        });
    }
}
