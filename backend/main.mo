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
      ("https://example.com/image1.jpg", "Because we always lose one sock in the laundry"),
      ("https://example.com/image2.jpg", "Because hot coffee always spills on important documents"),
      ("https://example.com/image3.jpg", "Because our phones always die at the most inconvenient times"),
      ("https://example.com/image4.jpg", "Because we can never find the TV remote when we need it"),
      ("https://example.com/image5.jpg", "Because our favorite snacks are always out of stock"),
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
