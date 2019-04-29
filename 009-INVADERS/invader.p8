pico-8 cartridge // http://www.pico-8.com
version 16
__lua__

--[[
 "C:\Program Files (x86)\PICO-8\pico8.exe" -run C:\Users\annoy\OneDrive\Documents\WireFrameJS\009-INVADERS\invader.p8
--]]

Shot = {
  matrix = {
    {0, 0, 0, 1, 0, 0},
    {0, 0, 1, 0, 0, 0},
    {0, 0, 0, 1, 0, 0},
    {0, 0, 0, 0, 1, 0},
    {0, 0, 0, 1, 0, 0},
    {0, 0, 1, 0, 0, 0},
    {0, 0, 0, 1, 0, 0},
    {0, 0, 0, 0, 1, 0}
  },
  x = 0,
  y = -9,
  colour = 0
}
function Shot:new (o)
  o = o or {}
  setmetatable(o, self)
  self.__index = self
  return o
end
function Shot:update()
  self.y += 1
end


Shield = {
  matrix = {
    {0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0},
    {0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0},
    {0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0},
    {0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0},
    {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
    {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
    {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
    {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
    {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
    {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
    {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
    {1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1},
    {1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1},
    {1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1},
    {1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1},
    {1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1}
  },
  x = 0,
  y = 100,
  colour = 11
}
function Shield:new (o)
  o = o or {}
  setmetatable(o, self)
  self.__index = self
  return o
end


shields = {}
points = 0
time_tracker = 0


function _init()
  x = 7
  for i = 1, 4 do
    shields[i] = Shield:new{x = x}
    x += 30
  end
  shot = Shot:new{x = 100}
end

function _update()
  if time_tracker < 10 then
    time_tracker += 1
  else
    time_tracker = 0
    shot:update()
  end
end

function _draw()
  cls(7)
  for s in pairs(shields) do
    for i in pairs(shields[s].matrix) do
      for j in pairs(shields[s].matrix[i]) do
        if shields[s].matrix[i][j] == 1 then
          pset(j + shields[s].x, i + shields[s].y, shields[s].colour);
        end
      end
    end
  end

  for i in pairs(shot.matrix) do
    for j in pairs(shot.matrix[i]) do
      if shot.matrix[i][j] == 1 then
        pset(j + shot.x, i + shot.y, shot.colour);
      end
    end
  end

end
