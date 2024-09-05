import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface BlogPost {
  'id' : bigint,
  'title' : string,
  'content' : string,
  'timestamp' : Time,
}
export interface Image { 'id' : bigint, 'url' : string, 'description' : string }
export type Result = { 'ok' : BlogPost } |
  { 'err' : string };
export type Time = bigint;
export interface _SERVICE {
  'addGalleryImage' : ActorMethod<[string, string], bigint>,
  'createBlogPost' : ActorMethod<[string, string], bigint>,
  'getBlogPost' : ActorMethod<[bigint], Result>,
  'getBlogPosts' : ActorMethod<[], Array<BlogPost>>,
  'getGalleryImages' : ActorMethod<[], Array<Image>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
