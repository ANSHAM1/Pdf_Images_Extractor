# from PyPDF2 import PdfReader
# import fitz
# from PIL import Image
# import pytesseract
# import os

# def extractTextFromPDF(path_to_pdf):
#     doc = fitz.open(path_to_pdf) 
#     out = open("./static/output.txt", "wb") 
#     for page in doc: 
#         text = page.get_text().encode("utf8")  # type: ignore
#         out.write(text) 
#         out.write(bytes((12,))) 
#     out.close()



# def extractImagesFromPDF(path_to_image):
#     file=[]
#     doc = fitz.open(path_to_image)
#     for i in range(len(doc)):
#         page = doc[i]
#         image_list = page.get_images()

#         for image_index, img in enumerate(image_list, start=1): 
#             xref = img[0] 
#             pix = fitz.Pixmap(doc, xref) 

#             if pix.n - pix.alpha > 3: 
#                 pix = fitz.Pixmap(fitz.csRGB, pix)

#             pix.save("./static/images/page_%s-image_%s.png" % (i, image_index)) 
#             pix = None

# extractTextFromPDF("./public/pdfFile.pdf")
# extractImagesFromPDF("./public/pdfFile.pdf")


# img_dir='./static/images'
# txt_dir = './static/text/'


# image_files = [f for f in os.listdir(img_dir) if os.path.isfile(os.path.join(img_dir, f))]

# for image_file in image_files:
    
#     img = Image.open(os.path.join(img_dir, image_file))

#     text = pytesseract.image_to_string(img)
    
#     txt_file_name = os.path.splitext(image_file)[0] + ".txt"
   
#     with open(os.path.join(txt_dir, txt_file_name), 'w') as f:
#         f.write(text)


# print("Text extraction from images and writing to text files completed.")

import fitz
import os
from PIL import Image

def extract_text_from_pdf(path_to_pdf):
    doc = fitz.open(path_to_pdf)
    with open("./static/output.txt", "wb") as out:
        for page in doc:
            text = page.get_text().encode("utf8")
            out.write(text)
            out.write(bytes((12,)))

def extract_images_from_pdf(path_to_pdf):
    doc = fitz.open(path_to_pdf)
    for i in range(len(doc)):
        page = doc[i]
        image_list = page.get_images(full=True)
        for image_index, img in enumerate(image_list, start=1):
            xref = img[0]
            base = os.path.join("./static/images", f"page_{i}_image_{image_index}")
            pix = fitz.Pixmap(doc, xref)
            if pix.n > 4:  
                pix = fitz.Pixmap(fitz.csRGB, pix)
            pix.save(f"{base}.png")



extract_text_from_pdf("./public/pdfFile.pdf")
extract_images_from_pdf("./public/pdfFile.pdf")
