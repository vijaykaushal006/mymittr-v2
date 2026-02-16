"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createEnhancedPost } from "@/app/actions/social";
import { uploadMedia } from "@/app/actions/media";

const FEELINGS = [
  { emoji: "😊", text: "happy" },
  { emoji: "😍", text: "loved" },
  { emoji: "😎", text: "cool" },
  { emoji: "😢", text: "sad" },
  { emoji: "😡", text: "angry" },
  { emoji: "🎉", text: "celebrating" },
  { emoji: "🤔", text: "thoughtful" },
  { emoji: "😴", text: "tired" },
];

const ACTIVITIES = [
  { icon: "🍕", text: "eating" },
  { icon: "✈️", text: "traveling" },
  { icon: "📚", text: "reading" },
  { icon: "🎵", text: "listening to music" },
  { icon: "🏃", text: "exercising" },
  { icon: "🎮", text: "playing" },
  { icon: "🎬", text: "watching" },
  { icon: "🎨", text: "creating" },
];

export default function CreatePostEnhanced() {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState<"public" | "friends" | "private">("public");
  const [feeling, setFeeling] = useState<string | null>(null);
  const [activity, setActivity] = useState<string | null>(null);
  const [location, setLocation] = useState("");
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [mediaPreviews, setMediaPreviews] = useState<string[]>([]);
  const [showFeeling, setShowFeeling] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [uploadingMedia, setUploadingMedia] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleMediaSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setMediaFiles((prev) => [...prev, ...files]);

    // Create previews
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeMedia = (index: number) => {
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
    setMediaPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("content", content);
      formData.append("visibility", visibility);
      if (feeling) formData.append("feeling", feeling);
      if (activity) formData.append("activity", activity);
      if (location) formData.append("location", location);

      // Upload media files
      if (mediaFiles.length > 0) {
        setUploadingMedia(true);
        for (const file of mediaFiles) {
          const result = await uploadMedia(file);
          if (result.success && result.url) {
            formData.append("media_urls", result.url);
            const mediaType = file.type.startsWith("video") ? "video" : "photo";
            formData.append("media_types", mediaType);
          }
        }
        setUploadingMedia(false);
      }

      await createEnhancedPost(formData);

      // Reset form
      setContent("");
      setVisibility("public");
      setFeeling(null);
      setActivity(null);
      setLocation("");
      setMediaFiles([]);
      setMediaPreviews([]);

      router.refresh();
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Main textarea */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          placeholder="What's on your mind?"
          className="w-full border-0 focus:ring-0 text-lg resize-none outline-none"
          rows={3}
        />

        {/* Feeling/Activity/Location Display */}
        <div className="flex flex-wrap gap-2">
          {feeling && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm">
              feeling {feeling}
              <button
                type="button"
                onClick={() => setFeeling(null)}
                className="ml-1 text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </span>
          )}
          {activity && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm">
              {activity}
              <button
                type="button"
                onClick={() => setActivity(null)}
                className="ml-1 text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </span>
          )}
          {location && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm">
              📍 {location}
              <button
                type="button"
                onClick={() => setLocation("")}
                className="ml-1 text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </span>
          )}
        </div>

        {/* Media Previews */}
        {mediaPreviews.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {mediaPreviews.map((preview, index) => (
              <div key={index} className="relative group">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeMedia(index)}
                  className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Feeling Selector */}
        {showFeeling && (
          <div className="border rounded-lg p-3">
            <p className="text-sm font-semibold mb-2">How are you feeling?</p>
            <div className="grid grid-cols-4 gap-2">
              {FEELINGS.map((f) => (
                <button
                  key={f.text}
                  type="button"
                  onClick={() => {
                    setFeeling(f.text);
                    setShowFeeling(false);
                  }}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="text-2xl">{f.emoji}</span>
                  <span className="text-sm">{f.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Activity Selector */}
        {showActivity && (
          <div className="border rounded-lg p-3">
            <p className="text-sm font-semibold mb-2">What are you doing?</p>
            <div className="grid grid-cols-4 gap-2">
              {ACTIVITIES.map((a) => (
                <button
                  key={a.text}
                  type="button"
                  onClick={() => {
                    setActivity(a.text);
                    setShowActivity(false);
                  }}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="text-2xl">{a.icon}</span>
                  <span className="text-sm">{a.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Location Input */}
        {showLocation && (
          <div className="border rounded-lg p-3">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Where are you?"
              className="w-full border-0 focus:ring-0 outline-none"
            />
          </div>
        )}

        <div className="border-t pt-3">
          <div className="flex items-center justify-between">
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={handleMediaSelect}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Add photos/videos"
              >
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => setShowFeeling(!showFeeling)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Add feeling"
              >
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => setShowActivity(!showActivity)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Add activity"
              >
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => setShowLocation(!showLocation)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Add location"
              >
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>

              {/* Privacy Selector */}
              <select
                value={visibility}
                onChange={(e) => setVisibility(e.target.value as any)}
                className="text-sm border-0 focus:ring-0 text-gray-600"
              >
                <option value="public">🌍 Public</option>
                <option value="friends">👥 Friends</option>
                <option value="private">🔒 Only me</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !content.trim()}
              className="px-6 py-2 bg-[#1e4d45] text-white rounded-lg font-semibold hover:bg-[#153a33] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploadingMedia ? "Uploading..." : loading ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
