import { TextPraiseForm } from "@/components/forms/form-text"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {ImagePraiseForm} from "@/components/forms/form-image";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
          <Tabs defaultValue="praise" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="praise" className="text-lg">
                      テキスト
                  </TabsTrigger>
                  <TabsTrigger value="chat" className="text-lg">
                      画像
                  </TabsTrigger>
              </TabsList>

              <TabsContent value="praise">
                  <TextPraiseForm />
              </TabsContent>

              <TabsContent value="chat">
                  <ImagePraiseForm />
              </TabsContent>
          </Tabs>
      </div>
    </main>
  )
}
