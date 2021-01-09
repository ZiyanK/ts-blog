import * as mongoose from "mongoose";

import { IArticle } from "../interfaces/article.interface";

const ArticleSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true
	},
	content: {
		type: String,
		required: true,
		trim: true
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	upvotes: {
		type: [mongoose.Schema.Types.ObjectId]
	}
}, {
	timestamps: true
});

const Article: mongoose.Model<IArticle> = mongoose.model<IArticle>('article', ArticleSchema);

export default Article;