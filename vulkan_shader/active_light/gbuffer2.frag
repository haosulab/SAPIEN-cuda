#version 450
#extension GL_ARB_separate_shader_objects : enable
#extension GL_ARB_shading_language_420pack : enable

layout(set = 2, binding = 0) uniform MaterialBuffer {
  vec4 baseColor;
  float fresnel;
  float roughness;
  float metallic;
  float transparency;
  int textureMask;
} materialBuffer;

layout(set = 2, binding = 1) uniform sampler2D colorTexture;
layout(set = 2, binding = 2) uniform sampler2D roughnessTexture;
layout(set = 2, binding = 3) uniform sampler2D normalTexture;
layout(set = 2, binding = 4) uniform sampler2D metallicTexture;

layout(location = 0) in vec4 inPosition;
layout(location = 1) in vec2 inUV;

layout(location = 0) out vec4 outAlbedo2;

void main() {
  if ((materialBuffer.textureMask & 1) != 0) {
    outAlbedo2 = texture(colorTexture, inUV);
  } else {
    outAlbedo2 = materialBuffer.baseColor;
  }
  if (outAlbedo2.a == 0) {
    discard;
  }
}
