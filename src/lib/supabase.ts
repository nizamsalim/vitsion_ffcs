import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

export class ImageService {
  static uploadImage(
    file: File,
    requestId: string
  ): Promise<{ url: string; path: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        const fileExt = file.name.split(".").pop();
        const filePath = `${requestId}.${fileExt}`;

        const { error } = await supabase.storage
          .from("requests")
          .upload(filePath, file, {
            upsert: false,
          });

        if (error) throw error;

        // get public url
        const { data } = supabase.storage
          .from("requests")
          .getPublicUrl(filePath);

        resolve({
          url: data.publicUrl,
          path: filePath,
        });
      } catch (error) {
        console.log(error);

        reject("Could not upload image. Please try again later");
      }
    });
  }

  static deleteImage(path: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const { error } = await supabase.storage
          .from("requests")
          .remove([path]);

        if (error) throw error;

        resolve(null);
      } catch (error) {
        reject("Something went wrong. Please try again later");
      }
    });
  }
}
