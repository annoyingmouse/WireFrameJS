pico-8 cartridge // http://www.pico-8.com
version 16
__lua__

--[[
 "C:\Program Files (x86)\PICO-8\pico_debug.bat" -run C:\Users\annoy\OneDrive\Documents\WireFrameJS\009-INVADERS\invader.p8
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
  x = flr(rnd(125)) - 3,
  y = -9,
  colour = 0
}
function Shot:new (o)
  o = o or {}
  setmetatable(o, self)
  self.__index = self
  return o
end

function Shot:draw ()
  for i, row in pairs(self.matrix) do
    for j, column in pairs(row) do
      if column == 1 then
        pset(j + self.x, i + self.y, self.colour);
      end
    end
  end
end

function Shot:update()
  self:draw()
  add(self.matrix, deepcopy(self.matrix[1]))
  idel(self.matrix, 1)
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

function Shield:draw ()
  for i, row in pairs(self.matrix) do
    for j, column in pairs(row) do
      if column == 1 then
        pset(j + self.x, i + self.y, self.colour);
      end
    end
  end
end

shields = {}
shots = {}
shot_tracker = 0
shots_tracker = 0


function _init()
  x = 7
  for i = 1, 4 do
    add(shields, Shield:new{x = x})
    x += 30
  end
  add(shots, Shot:new{x = flr(rnd(125)) - 3})
  
end

function _update()

  if shot_tracker < 5 then
    shot_tracker += 1
  else
    shot_tracker = 0
  end

  if shots_tracker < 120 then
    shots_tracker += 1
  else
    shots_tracker = 0
    add(shots, Shot:new{x = flr(rnd(125)) - 3})
  end

end

function _draw()
  cls(7)
  foreach(shields, function(shield) 
    shield:draw() 
  end)
  foreach(shots, function(shot) 
    if shot.y > 127 then
      del(shots, shot)
    elseif shot_tracker == 0 then
      shot:update()  
    else
      shot:draw()
    end
  end)
end

function idel(t,i)
  local n=#t
  if (i>0 and i<=n) then
    for j=i,n-1 do 
      t[j]=t[j+1] 
    end
    t[n]=nil
  end
end

function deepcopy(orig)
  local orig_type = type(orig)
  local copy
  if orig_type == 'table' then
      copy = {}
      for orig_key, orig_value in next, orig, nil do
          copy[deepcopy(orig_key)] = deepcopy(orig_value)
      end
      setmetatable(copy, deepcopy(getmetatable(orig)))
  else -- number, string, boolean, etc
      copy = orig
  end
  return copy
end
