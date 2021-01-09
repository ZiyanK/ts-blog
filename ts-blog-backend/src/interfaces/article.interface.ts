import * as mongoose from "mongoose";

export interface IArticle extends mongoose.Document {
	title: string,
	content: string;
	author: string;
	upvotes: Array<string>;
	createdAt: Date;
	modifiedAt: Date;
}