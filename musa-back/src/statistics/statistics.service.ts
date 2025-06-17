import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from '../posts/schemas/post.schema';

@Injectable()
export class StatisticsService {
    constructor(
        @InjectModel('Post') private postModel: Model<Post>,
    ) { }

    async getStatistics(graphic: number, range: string): Promise<any> {
        const dateFilter = this.getDateFilter(range);

        switch (graphic) {
            case 1:
                // 📊 Cantidad de publicaciones por usuario en rango
                return this.postModel.aggregate([
                    { $match: { createdAt: { $gte: dateFilter } } },
                    {
                        $group: {
                            _id: '$author',
                            count: { $sum: 1 }
                        }
                    },
                    { $sort: { count: -1 } }
                ]);

            case 2:
                // 💬 Cantidad de comentarios realizados en rango
                return this.postModel.aggregate([
                    { $unwind: '$comments' },
                    { $match: { 'comments.date': { $gte: dateFilter } } },
                    {
                        $group: {
                            _id: null,
                            totalComments: { $sum: 1 }
                        }
                    }
                ]).then(res => res[0] || { totalComments: 0 });

            case 3:
                // 💬 Cantidad de comentarios por publicación en rango
                return this.postModel.aggregate([
                    { $unwind: '$comments' },
                    { $match: { 'comments.date': { $gte: dateFilter } } },
                    {
                        $group: {
                            _id: '$_id', // ID del post
                            count: { $sum: 1 }
                        }
                    },
                    { $sort: { count: -1 } }
                ]);

            default:
                throw new NotFoundException('Gráfico no válido');
        }
    }


    private getDateFilter(range: string): Date {
        const now = new Date();

        switch (range) {
            case 'day':
                return new Date(now.getTime() - 24 * 60 * 60 * 1000);
            case 'week':
                return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            case 'month':
                return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            default:
                throw new Error('Rango de tiempo no válido');
        }
    }


}
