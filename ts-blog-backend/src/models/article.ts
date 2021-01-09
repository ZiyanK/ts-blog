import * as mongoose from "mongoose";

import { IArticle } from "../interfaces/article.interface";

const ArticleSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true
	},
	description: {
		type: String,
		required: true,
		trim: true,
		maxlength: 200,
		validate(value: string) {
			if(value.length > 200) {
				throw new Error("Character limit is being exceeded.");
			}
		}
	},
	content: {
		type: String,
		required: true,
		trim: true
	},
	tags: {
		type: [String],
		lowercase: true
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'user'
	},
	upvotes: {
		type: [mongoose.Schema.Types.ObjectId]
	}
}, {
	timestamps: true
});

const Article: mongoose.Model<IArticle> = mongoose.model<IArticle>('article', ArticleSchema);

export default Article;