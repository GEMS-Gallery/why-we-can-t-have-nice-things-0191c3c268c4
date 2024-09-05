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

  private func initializeGallery() {
    let examples = [
      ("https://example.com/image1.jpg", "Because our pets think expensive furniture is a fancy scratching post"),
      ("https://example.com/image2.jpg", "Because autocorrect has a vendetta against our reputation"),
      ("https://example.com/image3.jpg", "Because we always choose the slowest checkout line, every single time"),
      ("https://example.com/image4.jpg", "Because our plants have a death wish, no matter how much we care"),
      ("https://example.com/image5.jpg", "Because we can perfectly fold a fitted sheet... in our dreams"),
      ("https://example.com/image6.jpg", "Because our hair only looks perfect when we're not going anywhere"),
      ("https://example.com/image7.jpg", "Because we're masters at losing the TV remote in a one-room apartment"),
      ("https://example.com/image8.jpg", "Because our cooking smoke alarm is our most reliable dinner bell"),
      ("https://example.com/image9.jpg", "Because we're fluent in sarcasm, but our boss doesn't speak it"),
      ("https://example.com/image10.jpg", "Because our umbrella only remembers its job on sunny days"),
    ];

    var id = nextImageId;
    for ((url, description) in examples.vals()) {
      let image: Image = {
        id = id;
        url = url;
        description = description;
      };
      galleryImages := Array.append(galleryImages, [image]);
      id += 1;
    };
    nextImageId := id;
  };

  system func preupgrade() {
    // Preserve state before upgrade
  };

  system func postupgrade() {
    if (galleryImages.size() == 0) {
      initializeGallery();
    };
  };
}
