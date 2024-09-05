import Array "mo:base/Array";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Time "mo:base/Time";
import Result "mo:base/Result";
import Option "mo:base/Option";
import Buffer "mo:base/Buffer";

actor {
  type BlogPost = {
    id: Nat;
    title: Text;
    content: Text;
    timestamp: Time.Time;
  };

  type Image = {
    id: Nat;
    url: Text;
    description: Text;
  };

  stable var nextPostId: Nat = 0;
  stable var nextImageId: Nat = 0;
  stable var blogPosts: [BlogPost] = [];
  stable var galleryImages: [Image] = [];

  public query func getBlogPosts(): async [BlogPost] {
    blogPosts
  };

  public query func getBlogPost(id: Nat): async Result.Result<BlogPost, Text> {
    switch (Array.find<BlogPost>(blogPosts, func(post) { post.id == id })) {
      case (null) { #err("Blog post not found") };
      case (?post) { #ok(post) };
    }
  };

  public func createBlogPost(title: Text, content: Text): async Nat {
    let id = nextPostId;
    nextPostId += 1;
    let post: BlogPost = {
      id = id;
      title = title;
      content = content;
      timestamp = Time.now();
    };
    blogPosts := Array.append(blogPosts, [post]);
    id
  };

  public query func getGalleryImages(): async [Image] {
    galleryImages
  };

  public func addGalleryImage(url: Text, description: Text): async Nat {
    let id = nextImageId;
    nextImageId += 1;
    let image: Image = {
      id = id;
      url = url;
      description = description;
    };
    galleryImages := Array.append(galleryImages, [image]);
    id
  };
}
